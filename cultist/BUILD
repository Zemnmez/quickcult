load("//:rules.bzl", "jest_test", "ts_config", "ts_project")

package(default_visibility = ["//visibility:public"])

tsfiles = glob(
    ["*.ts"],
    exclude = ["*_test.ts", "save.ts"],
)

tstestfiles = glob(["*_test.ts"])

ts_project(
    name = "cultist",
    srcs = tsfiles,
    composite = True,
    declaration = True,
    tsconfig = "//:tsconfig_node",
    deps = [
        "//cultist/example",
        "//typescript",
        "//typescript/iter",
        "@npm//@types/uuid",
        "@npm//immutable",
    ],
)

# Separate project needed for 'save' to prevent dependency cycle.
ts_project(
    name = "save",
    srcs = [ "save.ts"],
    declaration = True,
    tsconfig = "//:tsconfig_node"
)

ts_project(
    name = "tests_lib_node",
    srcs = tstestfiles,
    composite = True,
    declaration = True,
    tsconfig = "//:tsconfig_node",
    deps = [
        ":cultist",
        "@npm//@types/jest",
    ],
)

jest_test(
    name = "test",
    srcs = [f[:-len(".ts")] + ".js" for f in tstestfiles],
    deps = [
        "//cultist",
        "@npm//immutable",
        "@npm//uuid",
    ],
)
