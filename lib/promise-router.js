const { Router } = require('express');

module.exports = class PromiseRouter extends Router {

	constructor(...args) {
		super(...args);
		for (const key of ['use', 'all', 'get', 'post', 'delete', 'patch']) {
			const method = this[key].bind(this);
			this[key] = (...middlewares) => method(...middlewares.map(middleware => {
				if (typeof middleware !== 'function') {
					return middleware;
				}
				return (req, res, next) => {
					const returned = middleware(req, res, next);
					if (returned instanceof Promise) {
						Promise.resolve(returned)
							.then(resolved => {
								res.locals.resolved = resolved;
								next();
							})
							.catch(next);
					}
				};
			}));
		}
	}
};