import Vue from "vue";

Vue.filter("friendlyBoolean", boolean => (boolean == true ? "Oui" : "Non"));

// returns the date as well as the hour
Vue.filter("fromTimestampToLocale", timestamp =>
  new Date(timestamp * 1000).toLocaleString("fr-FR")
);
// returns only the date
Vue.filter("fromTimestampToLocaleDate", timestamp =>
  new Date(timestamp * 1000).toLocaleDateString("fr-FR")
);
// Format Rails date to Paris Timezone
Vue.filter("formatDate", date => {
  let timestamp = Date.parse(date);
  return new Date(timestamp).toLocaleDateString("fr-FR");
});
