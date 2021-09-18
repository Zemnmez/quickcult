
async function main() {
	const target = process.argv[2];

	process.argv = process.argv.slice(2);

	if (!target?.trim()) throw new Error("No specified command to run");

	require('v8-compile-cache');

	require(target);
};

main().catch(e => {
	console.error(e);

	process.exitCode = 1;
});




