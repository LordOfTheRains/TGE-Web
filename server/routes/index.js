// The content of this file was generated by IBM Cloud
// Do not modify it as it might get overridden
module.exports = function(app, passport) {
    require('./public')(app);
    require('./health')(app);
    require('./items')(app);
    require('./users')(app, passport);
    require('./orders')(app, passport);
    require('./feed')(app, passport);
    require('./cart')(app, passport);
};
