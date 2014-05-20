window.Memories = Ember.Application.create({
	// rootElement: "#main_body",
    LOG_TRANSITIONS: true
});

// Memories.ApplicationAdapter = DS.FixtureAdapter.extend();
Memories.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'yogurtJam-emberjs'
});