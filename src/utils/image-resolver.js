// This needs to be fixed:
//
// - It is against `gatsby-image` and image pipeline processing.
// - PROBLEM: How to parametrize GraphQL fragment?
//   - You can't, so we need to do it in different way.

export const getImages = (resolver) => {
  return resolver.keys().reduce((accumulator, item) => {
    accumulator[item.replace(`./`, ``)] = resolver(item);
    return accumulator;
  }, {});
};
