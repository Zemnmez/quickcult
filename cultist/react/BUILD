load("//:rules.bzl", "ts_project")
load("@build_bazel_rules_nodejs//:index.bzl", "js_library")

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
    composite = True,
    declaration = True,
    preserve_jsx = True,
    incremental = True,
    tsconfig = "//:tsconfig_jsx",
    project_deps = [
        "//cultist:cultist",
    ],
    deps = [
        "@npm//@types/react",
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
