const fs = require('fs');

const about = fs.readFileSync('./contents/HTML/about.html', 'utf-8');
const blog = fs.readFileSync('./contents/HTML/blog.html', 'utf-8');
const contact = fs.readFileSync('./contents/HTML/contact.html', 'utf-8');
const index = fs.readFileSync('./contents/HTML/index.html', 'utf-8');
const pricing = fs.readFileSync('./contents/HTML/pricing.html', 'utf-8');
const service = fs.readFileSync('./contents/HTML/services.html', 'utf-8');
const work = fs.readFileSync('./contents/HTML/work.html', 'utf-8');

const data = {
	about: about,
	blog: blog,
	contact: contact,
	index: index,
	pricing: pricing,
	service: service,
	work: work
};

module.exports = { data };
