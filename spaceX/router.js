import Home from './views/Home.js';
import LaunchDetails from './views/LaunchDetails.js';

const pathToRegex = path => new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');

const getParams = match => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
  return Object.fromEntries(keys.map((key, i) => [key, values[i]]));
};

export const router = async () => {
  const routes = [
    { path: '/', view: Home },
    { path: '/launch/:id', view: LaunchDetails }
  ];

  const potentialMatches = routes.map(route => ({
    route: route,
    result: location.pathname.match(pathToRegex(route.path))
  }));

  let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname]
    };
  }

  const view = new match.route.view(getParams(match));
  document.querySelector('#app').innerHTML = await view.render();
};