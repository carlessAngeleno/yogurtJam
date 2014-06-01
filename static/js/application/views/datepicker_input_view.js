App.DatepickerInputView = Ember.TextField.extend({
  didInsertElement: function() {
    this.$().datepicker({
        defaultDate: "+1w",
        changeYear: true,      
        changeMonth: true,
        numberOfMonths: 1,
    });
  }
});

Ember.Handlebars.helper('datepicker-input', App.DatepickerInputView);