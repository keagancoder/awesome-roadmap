const rc = require('rc');
const { execSync } = require('child_process');

const npm = rc('npm', null, []);

module.exports = {
	name: npm['init-author-name'] || execSync('git config user.name').toString().trim(),
	email: npm['init-author-email'] || execSync('git config user.email').toString().trim(),
	url: npm['init-author-url'],
};
