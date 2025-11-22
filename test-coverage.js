const { execSync } = require('child_process');
const fs = require('fs');

console.log('🧪 Running Backend Test Suite...\n');

try {
  // Run tests with coverage
  execSync('npm run test:coverage', { stdio: 'inherit' });
  
  // Read coverage summary
  const coverageSummary = JSON.parse(
    fs.readFileSync('./coverage/coverage-summary.json', 'utf8')
  );
  
  const total = coverageSummary.total;
  
  console.log('\n📊 Coverage Summary:');
  console.log('='.repeat(50));
  console.log(`Lines:      ${total.lines.pct.toFixed(2)}%`);
  console.log(`Statements: ${total.statements.pct.toFixed(2)}%`);
  console.log(`Functions:  ${total.functions.pct.toFixed(2)}%`);
  console.log(`Branches:   ${total.branches.pct.toFixed(2)}%`);
  console.log('='.repeat(50));
  
  // Check if coverage meets minimum thresholds
  const minCoverage = 70;
  if (total.lines.pct < minCoverage) {
    console.log(`\n⚠️  Warning: Line coverage (${total.lines.pct.toFixed(2)}%) is below ${minCoverage}%`);
  } else {
    console.log('\n✅ Coverage thresholds met!');
  }
  
} catch (error) {
  console.error('❌ Tests failed');
  process.exit(1);
}