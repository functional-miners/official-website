const privateMetadata = require(`./metadata.private.js`);

module.exports = {
  siteUrl: `https://functional-miners.org`,

  headTitle: `Functional Miners | Place where all Silesian lambda lovers can meet and talk about their functional code | Beware, here be monads!`,

  title: `Functional Miners`,
  description: `Functional Miners is an IT meet-up organized in Silesian region, for people interested in computer science topics oriented around distributed systems, functional programming, functional languages, and programming languages theory in general.`,
  author: `Wojciech Gawroński`,
  tags: `lambda, lambda calculus, LISP, pure functional, monad, monoid, functional programming, functional languages, new programming languages, PLT, computer science, distributed systems, actor model`,

  socialMedia: {
    twitter: `@fun_miners`,
    facebook: `functionalminers`
  },

  contactData: {
    email: `functionalminers@gmail.com`,
  },

  ...privateMetadata
};
