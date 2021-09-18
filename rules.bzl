"""
This module contains generic bazel build rules for the project.
"""

load("//tools/jest:jest.bzl",  _jest_test = "jest_test")
load("@npm//@bazel/typescript:index.bzl", _ts_project = "ts_project", _ts_config = "ts_config" )
load("@npm//eslint:index.bzl", _eslint_test = "eslint_test")
load("@build_bazel_rules_nodejs//:index.bzl", _nodejs_binary = "nodejs_binary")

def nodejs_binary(**kwargs):
    _nodejs_binary(**kwargs)

def ts_config(**kwargs):
    _ts_config(**kwargs)

def jest_test(**kwargs):
    _jest_test(**kwargs)

def ts_lint(name, srcs = [], tags = [], data = [], **kwargs):
    targets = srcs + data
    eslint_test(
            name = name,
            data = targets,
            tags = tags + ["+formatting"],
            args = ["$(location %s)" % x for x in targets],
            **kwargs
    )



def ts_project(name, tags = [], deps = [], srcs = [], tsconfig = "//:tsconfig", **kwargs):
    _ts_project(
        name = name,
        tsc = "@npm//ttypescript/bin:ttsc",
	srcs = srcs,
        deps = deps + ["@npm//typescript-transform-paths"],
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
            "@npm//@typescript-eslint/eslint-plugin", "@npm//eslint-config-prettier"
        ],
        args = args + [ "--ignore-path", "$(location //:.gitignore)" ] +
            [ "$(location " + x + ")" for x in data ]
    )

