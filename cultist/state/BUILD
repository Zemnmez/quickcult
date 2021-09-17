load("//:rules.bzl", "ts_project", "jest_test", "ts_config")

package(default_visibility = [ "//visibility:public" ])

tsfiles = glob(["*.ts"], exclude = ["*_test.ts"])
tstestfiles = glob(["*_test.ts"])

ts_project(
    name = "state",
    srcs = tsfiles,
    declaration = True,
    tsconfig = "//:tsconfig_node",
    deps = [
        "//typescript/iter",
        "//cultist:save",
        "//typescript",
        "@npm//immutable",
        "@npm//@types/uuid"
    ]
)


ts_project(
	name = "tests_lib_node",
	srcs = tstestfiles,
	declaration = True,
	tsconfig = "//:tsconfig_node",
	deps = [
		"@npm//@types/jest",
		":state",
        "//cultist:save",
	]
)

jest_test(
	name = "test",
	srcs = [ f[:-len(".ts")] + ".js" for f in tstestfiles ],
	deps = [
        "//cultist:save",
		":state",
        "@npm//uuid",
        "@npm//immutable"
	]
)


