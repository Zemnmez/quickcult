load("//tools/jest:jest.bzl",  _jest_test = "jest_test")
load("@npm//@bazel/typescript:index.bzl", _ts_project = "ts_project")
load("@npm//eslint:index.bzl", _eslint_test = "eslint_test")
load("@npm//@bazel/typescript:index.bzl", _ts_config = "ts_config")
load("@build_bazel_rules_nodejs//:index.bzl", _nodejs_binary = "nodejs_binary", "js_library")

def nodejs_binary(link_workspace_root = None, **kwargs):
    _nodejs_binary(link_workspace_root = link_workspace_root, **kwargs)

def ts_config(**kwargs):
    _ts_config(**kwargs)

def jest_test(link_workspace_root = None, project_deps = [], deps = [], **kwargs):
    _jest_test(
        deps = deps + [ x + "_js" for x in project_deps ],
        link_workspace_root = link_workspace_root,
        **kwargs
    )

def ts_lint(name, srcs = [], tags = [], data = [], **kwargs):
    targets = srcs + data
    eslint_test(
            name = name,
            data = targets,
            tags = tags + ["+formatting"],
            args = ["$(location %s)" % x for x in targets],
            **kwargs
    )


def ts_project(name, link_workspace_root = None, project_deps = [], deps = [], srcs = [], validate = None, incremental = None, composite = False, tsconfig = "//:tsconfig_build", declaration = False, preserve_jsx = None, **kwargs):
    deps = deps + [dep + "_ts" for dep in project_deps ]
    __ts_project(
        name = name + "_ts",
        srcs = srcs,
        deps = deps,
        composite = composite,
        declaration = declaration,
        tsconfig = tsconfig,
        preserve_jsx = preserve_jsx,
        incremental = incremental,
        link_workspace_root = link_workspace_root,
        validate = validate,
        **kwargs
    )

    js_library(
        name = name + "_js",
        deps = [ dep + "_js" for dep in project_deps ] + deps,
        srcs = [ src[:src.rfind(".")] + ".js" for src in srcs ],
        **kwargs
    )


def __ts_project(name, tags = [], deps = [], srcs = [], tsconfig = "//:tsconfig_build", **kwargs):
    _ts_project(
        name = name,
        srcs = srcs,
        deps = deps,
        tags = tags,
        tsconfig = tsconfig,
        **kwargs,
    )

    ts_lint(name = name + "_lint", data = srcs, tags = tags)

def eslint_test(name = None, data = [], args = [], **kwargs):
    _eslint_test(
        name = name,
        data = data + [
            "//:.prettierrc.json",
            "//:.gitignore",
            "//:.editorconfig",
            "//:.eslintrc.json",

            "@npm//eslint-plugin-prettier", "@npm//@typescript-eslint/parser",
            "@npm//@typescript-eslint/eslint-plugin", "@npm//eslint-config-prettier",
        ],
        args = args + [ "--ignore-path", "$(location //:.gitignore)" ] +
            [ "$(location " + x + ")" for x in data ]
    )

