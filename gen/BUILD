load("//:rules.bzl", "nodejs_binary", "ts_project")
load("@rules_proto//proto:defs.bzl", "proto_library")
load("@com_google_protobuf//:protobuf.bzl", "py_proto_library")

package(default_visibility = [
    ":__subpackages__",
    "//solve:__subpackages__",
])

ts_project(
    name = "gen",
    srcs = ["collate_game_core.ts"],
    composite = True,
    declaration = True,
    incremental = True,
    tsconfig = "//:tsconfig_node",
    deps = [
        "@npm//@types/node",
    ],
)

nodejs_binary(
    name = "collate_game_core",
    entry_point = "collate_game_core.js",
)

genrule(
    name = "gen_core",
    srcs = ["//gen/cultist_data:steam_gen_cultist_out.zip"],
    outs = ["core_en.json"],
    cmd = "$(execpath @bazel_tools//tools/zip:zipper) x $(location //gen/cultist_data:steam_gen_cultist_out.zip) -d $(location :core_en.json)_gamedir_tmp &&" +
          "find $@_gamedir_tmp/CS_Data/StreamingAssets/content/core -name '*.json' | xargs ./$(execpath //gen:collate_game_core) > $@",
    exec_tools = [":collate_game_core"],
    message = "generating collated game data",
    tools = ["@bazel_tools//tools/zip:zipper"],
)

proto_library(
    name = "core_proto",
    srcs = ["core.proto"],
    deps = [
        "//proto:cultist_proto",
        "@com_google_protobuf//:struct_proto",
    ],
)

py_proto_library(
    name = "core_py_proto",
    srcs = ["core.proto"],
    deps = [
        "//proto:cultist_py_proto",
        "@com_google_protobuf//:protobuf_python",
    ],
)

py_library(
    name = "core_py",
    srcs = ["core.py"],
    data = ["//gen:core_en.json"],
    deps = ["//gen:core_py_proto"],
)
