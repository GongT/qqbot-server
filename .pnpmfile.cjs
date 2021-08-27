const fs = require('fs');
const { resolve } = require('path');

function load_deps(kind) {
	const pkg = resolve(__dirname, kind, 'package.json');
	const data = fs.readFileSync(pkg, 'utf-8');
	const pkgData = JSON.parse(data);

	const deps = {};
	if (pkgData.optionalDependencies) Object.assign(deps, pkgData.optionalDependencies);
	if (pkgData.devDependencies) Object.assign(deps, pkgData.devDependencies);
	if (pkgData.dependencies) Object.assign(deps, pkgData.dependencies);

	return deps;
}
const localDeps = {
	...load_deps('library'),
	...load_deps('my-server'),
};

function readPackage(pkg, context) {
	for (const key of ['optionalDependencies', 'devDependencies', 'dependencies']) {
		if (!pkg[key]) continue;

		const deps = pkg[key];
		for (const name of Object.keys(deps)) {
			if (name.startsWith('@types/') && localDeps[name]) {
				if (deps[name] !== localDeps[name]) {
					context.log(`lock "${pkg.name}".${key}."${name}": ${deps[name]} => ${localDeps[name]}`);
					deps[name] = localDeps[name];
				}
			}
		}

	}
	return pkg;
}

module.exports = {
	hooks: {
		readPackage
	}
};
