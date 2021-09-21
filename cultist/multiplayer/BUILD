load("@npm//next:index.bzl", "next")
load("//:rules.bzl", "ts_config", "ts_project")

built_next_config_files = [":next.config.js"]

glob_exclusions = [
    "next.config.ts",
    ".next/**",
]

next_deps = [
    "//cultist/multiplayer/public",
    "//cultist/multiplayer/styles",
    "//cultist/multiplayer/pages:pages_js",
    ":next.config.js",
    ":tsconfig_next",
    "//:tsconfig.json",
    "//:jsx.tsconfig.json",
    "//typescript/config:jsx.tsconfig.json",
]

next(
    name = "next",
    templated_args = [
        "$(rootpaths //cultist/multiplayer/pages:pages_js)/cultist/multiplayer",
    ],
    data = next_deps,
    link_workspace_root = True
)

genrule(
    name = "multiplayer",
    outs = ["build.tar.gz"],
    cmd = """
        NEXT_ROOT=./cultist/multiplayer;
        $(execpaths :next) build
        $(execpaths :next) export
        tar -czvf $@ $$NEXT_ROOT/out
    """,
    exec_tools = [
        ":next",
    ],
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
    srcs = ["next.config.ts"],
    composite = True,
    declaration = True,
    incremental = True,
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
