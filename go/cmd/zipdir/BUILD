<<<<<<< HEAD
load("@io_bazel_rules_go//go:def.bzl", "go_binary")
=======
load("//:rules.bzl", "go_binary")
>>>>>>> main

go_binary(
    name = "zipdir",
    srcs = glob(["*.go"]),
<<<<<<< HEAD
    visibility = ["//visibility:public"],
    deps = [
        "//go/archive/zip/ziputil",
        "//go/flag/flagutil",
    ],
=======
    deps = [
        "//go/archive/zip/ziputil:ziputil",
        "//go/flag/flagutil:flagutil"
        ],
    visibility = ["//visibility:public"]
>>>>>>> main
)
