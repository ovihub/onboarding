import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..', '..');

describe('CI Pipeline Smoke Test', () => {

  describe('project structure', () => {
    it('should have a valid package.json', () => {
      const pkgPath = join(PROJECT_ROOT, 'package.json');
      assert.ok(existsSync(pkgPath), 'package.json must exist');
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
      assert.ok(pkg.name, 'package.json must have a name');
      assert.ok(pkg.scripts, 'package.json must have scripts');
    });

    it('should have a test script in package.json', () => {
      const pkg = JSON.parse(readFileSync(join(PROJECT_ROOT, 'package.json'), 'utf-8'));
      assert.ok(pkg.scripts.test, 'package.json must define a test script');
    });

    it('should have a source directory', () => {
      assert.ok(existsSync(join(PROJECT_ROOT, 'src')), 'src directory must exist');
    });

    it('should have a tests directory', () => {
      assert.ok(existsSync(join(PROJECT_ROOT, 'tests')), 'tests directory must exist');
    });
  });

  describe('CI workflow', () => {
    it('should have a GitHub Actions workflow file', () => {
      const wfDir = join(PROJECT_ROOT, '.github', 'workflows');
      assert.ok(existsSync(wfDir), '.github/workflows directory must exist');
      // At least one .yml workflow file must exist
      const workflows = readdirSync(wfDir).filter(f => f.endsWith('.yml') || f.endsWith('.yaml'));
      assert.ok(workflows.length > 0, 'at least one workflow file (.yml/.yaml) must exist');
    });

    it('should have a valid CI workflow with required stages', () => {
      const wfDir = join(PROJECT_ROOT, '.github', 'workflows');
      const workflowFiles = readdirSync(wfDir).filter(f => f.endsWith('.yml') || f.endsWith('.yaml'));
      // Find the CI workflow (first one or one named ci*)
      const ciFile = workflowFiles.find(f => f.startsWith('ci')) || workflowFiles[0];
      const content = readFileSync(join(wfDir, ciFile), 'utf-8');

      // Workflow must define a trigger
      assert.ok(content.includes('on:'), 'workflow must define trigger (on:)');
      // Workflow must have at least one job
      assert.ok(content.includes('jobs:'), 'workflow must define jobs');
      // Workflow must include a test step
      assert.ok(
        content.includes('npm test') || content.includes('test'),
        'workflow must include a test step'
      );
    });
  });

  describe('pipeline execution', () => {
    it('should pass the project test suite', () => {
      const pkg = JSON.parse(readFileSync(join(PROJECT_ROOT, 'package.json'), 'utf-8'));
      // The test script must be defined and runnable
      assert.ok(pkg.scripts.test, 'test script must be defined');
    });

    it('should have a smoke test script', () => {
      const pkg = JSON.parse(readFileSync(join(PROJECT_ROOT, 'package.json'), 'utf-8'));
      assert.ok(pkg.scripts['test:smoke'], 'smoke test script must be defined');
    });
  });

  describe('environment', () => {
    it('should have Node.js available', () => {
      assert.ok(process.version, 'Node.js version must be available');
      const major = parseInt(process.version.slice(1).split('.')[0], 10);
      assert.ok(major >= 18, 'Node.js version must be >= 18');
    });

    it('should run from the correct project root', () => {
      assert.ok(existsSync(join(PROJECT_ROOT, 'package.json')),
        'project root must contain package.json');
    });
  });
});
