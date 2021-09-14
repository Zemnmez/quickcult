load("//:rules.bzl", "jest_test", "ts_config", "ts_project")

package(default_visibility = ["//visibility:public"])

tsfiles = glob(
    [
        "*.ts",
        "*.tsx",
    ],
    exclude = [
        "*_test.ts",
        "*_test.tsx",
    ],
)

tstestfiles = glob(["*_test.ts"])

ts_project(
    name = "react",
    srcs = tsfiles,
    allow_js = True,
    declaration = True,
    preserve_jsx = True,
    tsconfig = "//:tsconfig_jsx",
    deps = [
        "//cultist",
        "@npm//react",
    ],
)

"""
ts_project(
	name = "tests_lib_node",
	srcs = tstestfiles,
	declaration = True,
	tsconfig = "//:tsconfig_node",
	deps = [
		"@npm//@types/jest",
		":cultist"
	]
)

jest_test(
	name = "test",
	srcs = [ f[:-len(".ts")] + ".js" for f in tstestfiles ],
	deps = [
		"//cultist",
        "@npm//uuid",
        "@npm//immutable"
	]
)
"""
