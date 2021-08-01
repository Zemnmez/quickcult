load("@io_bazel_rules_go//go:def.bzl", "go_binary")
load("@io_bazel_rules_docker//container:container.bzl", "container_image")

go_binary(
    name = "gen_cultist_data",
    srcs = glob(["*.go"])
)

container_image(
    name = "steam_container",
    base = "@steamcmd//image",
)


genrule(
    name = "steam_gen_cultist",
    exec_tools = [  ":steam_container"],
    tools = [ "@bazel_tools//tools/zip:zipper" ],
    outs = [ "steam_gen_cultist_out" ],
    cmd = "$(location :steam_container) && docker run -v $$(realpath $@)_tmp:/steam_gen_cultist_gen_data bazel/gen/cultist_data:steam_container +login anonymous +force_install_dir /steam_gen_cultist_gen_data +app_update 718670 +quit"
        +  "&& $(location @bazel_tools//tools/zip:zipper) c $@ $@_tmp",
    message = "downloading cultist simulator..."
)