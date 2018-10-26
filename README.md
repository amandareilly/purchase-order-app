# Purchaser

Purchaser is an app that allows users in a small business environment to create, approve, and manage purchase orders.

Small businesses often struggle with purchasing, and this app enables users to see at-a-glance items that have been requested, and the status of those items as they move through the purchasing process.

There are two user roles in the system. Basic users can create purchase orders, and can view and manage their own purchase orders. Approvers have the same permissions as Basic users, plus they can view and approve or deny purchase orders created by any user.

**The live app can be accessed at http://purchaser.amandareilly.me**

## Using Locally
If you would like to run this app on your local development server, you must install NPM and Gulp to build the project.

Once you have installed NPM and Gulp, cd into the project directory, and run 'npm install' (or 'sudo npm install' depending on your environment settings) and then gulp build to build the proper file structure.

Once installed and built, you can access the project at http://localhost:8080.  As the client does not currently have a user creation endpoint, you can load http://localhost:8080/seed to seed the database with demo users and data.

Alternately, if you would like to create one or more users, but no additional data, you can comment out line 14 of the /server/routes/apiRouter.js file (router.use(authMiddleware)), and then post the /api/users endpoint in the format: 
```javascript
{
    'email': 'test@test.com',
    'role': 'basic',
    'firstName': 'Name',
    'lastName': 'Name'
}
```
Only email address is required.  All other fields are optional.  Valid roles are 'basic' and 'approver'.  If no role is specified, it will default to 'basic'.

## Techology Used

* HTML5
* CSS3
* JavaScript
* jQuery
* Node.js
* MongoDB

## Frameworks and Plugins

* [Handlebars](https://handlebarsjs.com/) - JavaScript Templating Engine
* [Express.js](https://expressjs.com/) - Web framework for Node.js
* [Mocha](https://mochajs.org/) - JavaScript test framework
* [Mongoose](https://mongoosejs.com/) - ODM (Object Document Mapper) for Node.js and MongoDB

### Build Tools

* [NPM](https://www.npmjs.com/) - Package Manager
* [Gulp.js](https://gulpjs.com/) - Workflow Automation
* [SASS](https://sass-lang.com/) - CSS Pre-Processor
* [Babel](https://babeljs.io/) - JavaScript Compiler
* [webpack](https://webpack.js.org/) - Module Bundler
* [git](https://git-scm.com/) - Source Control

### CI and Depoloyment

* [Travis CI](https://travis-ci.org/) - Continuous Integration
* [Heroku](https://www.heroku.com) - Cloud Deployment
* [mLab](https://mlab.com) - Database-as-a-Service for MongoDB

## Author

* **Amanda Reilly** - [amandareilly](https://github.com/amandareilly)

## License

This project is licensed under the MIT License.

## Screenshots

![homepage screenshot](https://github.com/amandareilly/purchase-order-app/blob/master/screenshots/home-page.PNG)

![open create request form](https://github.com/amandareilly/purchase-order-app/blob/master/screenshots/create-request-form.PNG)

![basic user dashboard](https://github.com/amandareilly/purchase-order-app/blob/master/screenshots/basic-user-dashboard.PNG)

![basic user dashboard with open filter panel](https://github.com/amandareilly/purchase-order-app/blob/master/screenshots/basic-user-filters.PNG)

![basic user dashboard showing action panels](https://github.com/amandareilly/purchase-order-app/blob/master/screenshots/basic-user-dashboard-open-action-panel.PNG)

![basic user dashboard showing item panels](https://github.com/amandareilly/purchase-order-app/blob/master/screenshots/basic-user-open-item-panels.PNG)

![approver dashboard](https://github.com/amandareilly/purchase-order-app/blob/master/screenshots/approver-user-dashboard.PNG)

![approver dashboard with other user filters](https://github.com/amandareilly/purchase-order-app/blob/master/screenshots/approver-other-user-filters.PNG)

![approver dashboard with own filters](https://github.com/amandareilly/purchase-order-app/blob/master/screenshots/approver-own-filters.PNG)

![basic user created request detail](https://github.com/amandareilly/purchase-order-app/blob/master/screenshots/basic-user-created-request-detail.PNG)

![basic user request with add item form open](https://github.com/amandareilly/purchase-order-app/blob/master/screenshots/basic-user-add-item-form.PNG)

![approver submitted request detail](https://github.com/amandareilly/purchase-order-app/blob/master/screenshots/approver-submitted-request-detail.PNG)
