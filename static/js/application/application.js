window.Memories = Ember.Application.create({
	rootElement: "#interface",
    LOG_TRANSITIONS: true
});

Memories.ApplicationAdapter = DS.FixtureAdapter.extend();