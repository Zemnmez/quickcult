load("//tools/jest:jest.bzl", _jest_test = "jest_test")
load("//tools/go:go.bzl", _test_go_fmt = "test_go_fmt")
load("@io_bazel_rules_go//go:def.bzl", _go_binary = "go_binary", _go_library = "go_library", _go_test = "go_test")
load("@npm//@bazel/typescript:index.bzl", _ts_config = "ts_config", _ts_project = "ts_project")
load("@npm//eslint:index.bzl", _eslint_test = "eslint_test")
load("@build_bazel_rules_nodejs//:index.bzl", "js_library", _nodejs_binary = "nodejs_binary")

def append_tag(selector, tag):
    if selector.startswith("//") and (":" not in selector):
        return selector + ":" + selector[selector.rfind("/")+1:] + tag
    return selector + tag

def nodejs_binary(**kwargs):
    _nodejs_binary(**kwargs)

def ts_config(**kwargs):
    _ts_config(**kwargs)

def jest_test(link_workspace_root = None, project_deps = [], deps = [], **kwargs):
    _jest_test(
        deps = deps + [append_tag(x + "_js") for x in project_deps],
        **kwargs
    )

def ts_lint(name, srcs = [], tags = [], data = [], **kwargs):
    targets = srcs + data
    eslint_test(
            name = name,
            data = targets,
            tags = tags + ["ts_formatting"],
            args = ["$(location %s)" % x for x in targets],
            **kwargs
    )


def ts_project(name, project_deps = [], deps = [], srcs = [], validate = None, link_workspace_root = True, incremental = None, resolve_json_module = None, composite = False, tsconfig = "//:tsconfig_build", declaration = False, preserve_jsx = None, **kwargs):
    __ts_project(
        name = name + "_ts",
        deps = deps + [append_tag(dep, "_ts") for dep in project_deps ],
        srcs = srcs,
        composite = composite,
        declaration = declaration,
        tsconfig = tsconfig,
        preserve_jsx = preserve_jsx,
        incremental = incremental,
        link_workspace_root = link_workspace_root,
        validate = validate,
        **kwargs
    )

    js_srcs = [ src[:src.rfind(".")] + ".js" for src in srcs ]

    if preserve_jsx:
        js_srcs = [ src.replace(".ts", ".js").replace("tsx", ".jsx") for src in srcs ]

    js_library(
        name = name + "_js",
        deps = [ append_tag(dep, "_js") for dep in project_deps ] + deps,
        srcs = js_srcs,
        **kwargs
    )


def __ts_project(name, tags = [], deps = [], srcs = [], tsconfig = "//:tsconfig_build", **kwargs):
    _ts_project(
        name = name,
        srcs = srcs,
        deps = deps,
        tags = tags,
        tsconfig = tsconfig,
        **kwargs
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
        args = args + ["--ignore-path", "$(location //:.gitignore)"] +
               ["$(location " + x + ")" for x in data],
    )

def go_binary(name = None, importpath = None, deps = [], **kwargs):
    _go_binary(
        name = name,
        deps = deps,
        importpath = importpath,
        **kwargs
    )

    _test_go_fmt(
        name = name + "_fmt",
        **kwargs
    )

def go_test(name = None, importpath = None, deps = [], **kwargs):
    _go_test(
        name = name,
        deps = deps,
        importpath = importpath,
        **kwargs
    )

    _test_go_fmt(
        name = name + "_fmt",
        **kwargs
    )

def go_library(name = None, importpath = None, deps = [], **kwargs):
    _go_library(
        name = name,
        deps = deps,
        importpath = importpath,
        **kwargs
    )

    _test_go_fmt(
        name = name + "_fmt",
        **kwargs
    )
