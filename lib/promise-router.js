const assert = require('assert');
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
				assert(middleware.length < 4, 'PromiseRouter middlewares can\'t handle errors');
				return (req, res, next) => {
					const returned = middleware(req, res, next);
					if (returned instanceof Promise) {
						assert(middleware.length < 3, 'PromiseRouter middlewares that return promises can\'t use next()');
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
