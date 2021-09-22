class BazelReporter {
	onRunComplete(
		_: unknown,
		results: { numFailedTests?: number; snapshot: { failure: boolean } }
	) {
		console.log('Running tests with args: ', process.argv);
		if (results.numFailedTests && results.snapshot.failure) {
			console.log(`================================================================================

      Snapshot failed, you can update the snapshot by running
      bazel run ${process.env['TEST_TARGET']!.replace(/_bin$/, '')}.update
      `);
		}
	}
}

module.exports = BazelReporter;
