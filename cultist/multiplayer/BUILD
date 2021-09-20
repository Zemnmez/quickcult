load("@npm//next:index.bzl", "next")
load("//:rules.bzl", "ts_config", "ts_lint", "ts_project")

ts_lint(
    name = "lint",
    data = glob([
        "**/*.ts",
        "**/*.js",
    ]),
)

built_next_config_files = [":next.config.js"]
glob_exclusions = [ "next.config.ts", ".next/**"]

next_deps = [
        "//cultist/multiplayer/public",
        "//cultist/multiplayer/styles",
        "//cultist/multiplayer/pages",
        ":next.config.js",
        ":tsconfig_next",
        "//:tsconfig.json",
        "//:jsx.tsconfig.json",
        "//typescript/config:jsx.tsconfig.json"
    ]



next(
    name = "next",
    args = [
        "./cultist/multiplayer",
        "next",
    ],
    data = next_deps,
)



genrule(
    name = "multiplayer",
    srcs = next_deps,
    outs = ["build.tar.gz"],
    cmd = """
        $(execpath @npm//next/bin:next) build ./cultist/multiplayer &&
        $(execpath @npm//next/bin:next) export ./cultist/multiplayer &&
        tar -czvf $@ ./cultist/multiplayer/out
    """,
    exec_tools = [
        "@npm//next/bin:next",
        "@npm//:node_modules",
    ] + [],
)

next(
    name = "start",
    args = [
        "./cultist/multiplayer",
        "start",
    ],
    data = next_deps,
)

ts_project(
    name = "config_js",
    srcs = [ "next.config.ts" ],
    composite = True,
    declaration = True,
    tsconfig = "//:tsconfig_node",
    deps = [
        "@npm//@types/node",
        "@npm//next",
    ],
)

ts_config(
    name = "tsconfig_next",
    src = "tsconfig.json",
    deps = ["//:tsconfig_jsx"],
)
