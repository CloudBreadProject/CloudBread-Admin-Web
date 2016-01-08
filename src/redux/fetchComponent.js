export default function fetchComponentData(dispatch, components, params) {
  const needs = [];
  components
    .filter(x => !!x)
    .forEach(x => {
      const component = x.WrappedComponent;
      if (!component || !component.needs) {
        return;
      }
      component.needs.forEach(need => needs.push(need));
    });
  const promises = needs.map(need => dispatch(need(params)));
  return Promise.all(promises);
}
