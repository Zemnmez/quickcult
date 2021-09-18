load("//:rules.bzl", "jest_test", "ts_project")

package(default_visibility = ["//visibility:public"])

tsfiles = glob(
    ["*.ts"],
    exclude = ["*_test.ts"],
)

tstestfiles = glob(["*_test.ts"])

ts_project(
    name = "state",
    srcs = tsfiles,
    composite = True,
    declaration = True,
    tsconfig = "//:tsconfig_node",
    deps = [
        "//cultist:save",
        "//typescript",
        "//typescript/iter",
        "@npm//@types/uuid",
        "@npm//immutable",
    ],
)

ts_project(
    name = "tests_lib_node",
    srcs = tstestfiles,
    composite = True,
    declaration = True,
    tsconfig = "//:tsconfig_node",
    deps = [
        ":state",
        "//cultist:save",
        "@npm//@types/jest",
    ],
)

jest_test(
    name = "test",
    srcs = [f[:-len(".ts")] + ".js" for f in tstestfiles],
    deps = [
        ":state",
        "//cultist:save",
        "@npm//immutable",
        "@npm//uuid",
    ],
)
