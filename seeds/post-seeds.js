const { Post } = require("../models");

const postdata = [
  {
    title: "Iron Man Suit",
    text_body:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consect",
    repo_name: "Buzzfeed",
    github_repo_url: "https://buzzfeed.com/in/imperdiet/et/commodo/vulputate.png",
    user_id: 10,
  },
  {
    title: "Siri ate my lunch",
    text_body: "Morbi non quam nec dui luctus rutrum.",
    repo_name: "Nasa",
    github_repo_url: "https://nasa.gov/donec.json",
    user_id: 8,
  },
  {
    title: "Donec diam neque",
    text_body: "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.",
    repo_name: "Europa",
    github_repo_url: "https://europa.eu/parturient/montes/nascetur/ridiculus/mus/etiam/vel.aspx",
    user_id: 1,
  },
  {
    title: "Nunc purus.",
    text_body: "Pellentesque eget nunc.",
    repo_name: "DesDev",
    github_repo_url: "http://desdev.cn/enim/blandit/mi.jpg",
    user_id: 4,
  },
  {
    title: "Pellentesque eget nunc.",
    text_body: "Pellentesque eget nunc.",
    repo_name: "Google",
    github_repo_url: "http://google.ca/nam/nulla/integer.aspx",
    user_id: 7,
  },
  {
    title: "Lorem ipsum dolor sit amet.",
    text_body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    repo_name: "Standford",
    github_repo_url: "https://stanford.edu/consequat.png",
    user_id: 4,
  },
  {
    title: "In hac habitasse platea dictumst.",
    text_body: "In hac habitasse platea dictumst.",
    repo_name: "eduBlogs",
    github_repo_url: "http://edublogs.org/non/ligula/pellentesque.js",
    user_id: 1,
  },
  {
    title: "Morbi non quam nec.",
    text_body: "Morbi non quam nec dui luctus rutrum.",
    repo_name: "UCLA",
    github_repo_url: "http://ucla.edu/consequat/nulla.html",
    user_id: 1,
  },
  {
    title: "Duis ac nibh.",
    text_body: "Duis ac nibh.",
    repo_name: "The Guardian",
    github_repo_url: "http://theguardian.com/dui/vel/nisl/duis/ac/nibh.aspx",
    user_id: 9,
  },
  {
    title: "Curabitur at ipsum.",
    text_body: "Curabitur at ipsum ac tellus semper interdum.",
    repo_name: "reverbnation",
    github_repo_url: "https://reverbnation.com/ligula/sit.jpg",
    user_id: 5,
  },
  {
    title: "In hac habitasse platea dictumst.",
    text_body: "In hac habitasse platea dictumst.",
    repo_name: "DesDev2",
    github_repo_url: "http://china.com.cn/lectus/vestibulum.json",
    user_id: 3,
  },
  {
    title: "Morbi odio odio.",
    text_body: "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.",
    repo_name: "Networks Solution",
    github_repo_url: "http://networksolutions.com/nam/ultrices/libero/non/mattis/pulvinar.json",
    user_id: 10,
  },
  {
    title: "Donec dapibus.",
    text_body: "Donec dapibus.",
    repo_name: "DesDev",
    github_repo_url: "https://instagram.com/ac/neque/duis/bibendum/morbi/non.xml",
    user_id: 8,
  },
  {
    title: "Nulla tellus.",
    text_body: "Nulla tellus.",
    repo_name: "DesDev",
    github_repo_url: "https://lycos.com/natoque/penatibus/et.html",
    user_id: 3,
  },
  {
    title: "Cras mi pede, malesuada in.",
    text_body: "mi pede, malesuada in, imperdiet et, commodo vulputate, justo.",
    repo_name: "DesDev",
    github_repo_url: "https://gmpg.org/lorem.jpg",
    user_id: 3,
  },
  {
    title: "Vestibulum ante ipsum.",
    text_body:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.",
    repo_name: "DesDev",
    github_repo_url: "https://paginegialle.it/mattis/egestas.jsp",
    user_id: 7,
  },
  {
    title: "In hac habitasse platea dictumst.",
    text_body: "In hac habitasse platea dictumst.",
    repo_name: "DesDev",
    github_repo_url: "http://wikia.com/turpis/eget.jpg",
    user_id: 6,
  },
  {
    title: "Etiam justo.",
    text_body: "Etiam justo.",
    repo_name: "DesDev",
    github_repo_url: "https://shareasale.com/quis.json",
    user_id: 4,
  },
  {
    title: "Nulla ut erat id mauris.",
    text_body: "Nulla ut erat id mauris vulputate elementum.",
    repo_name: "DesDev",
    github_repo_url: "http://java.com/diam/neque/vestibulum/eget/vulputate/ut/ultrices.png",
    user_id: 6,
  },
  {
    title: "Integer pede justo.",
    text_body: "eger pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
    repo_name: "Java",
    github_repo_url: "https://java.com/at/nibh/in.png",
    user_id: 7,
  },
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
