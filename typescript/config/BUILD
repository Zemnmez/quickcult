
load("//:rules.bzl", "ts_config")

ts_config(
    name = "node",
    src = "node.tsconfig.json",
    deps = [ ":build" ],
    visibility = [ "//visibility:public" ]
)

ts_config(
    name = "jsx",
    src = "jsx.tsconfig.json",
    deps = [ ":build" ],
    visibility = [ "//visibility:public" ]
)

ts_config(
    name = "build",
    src = "build.tsconfig.json",
    deps = [ "//:tsconfig" ],
    visibility = [ "//visibility:public" ]
)
