<template lang="pug">
  .section
    .container
      h1 Documentation des APIs du Dashboard API Entreprise

      .panel
        p Afin de connaître l’état des services d’API Entreprise vous disposez de 2 APIs :
        ul
          li <span class="label">/current_status</span>: le dernier état constaté de chacune de nos APIs
          li <span class="label">/availability_history</span>: l’historique de disponibilité de chacune des APIs

        pre
        h2 Comment ses données sont-elles générées ?

        p Nous surveillons régulièrement chacune de nos APIs avec une fréquence variable en fonction de la charge que peut tenir le fournisseur de données. Cela va d’un ping toutes les minutes ou au maximum toutes les heures.

        p Le numéro de SIREN ou SIRET est choisit de façon à être élligible à l’API en question.

      h2 Les APIs

      .panel
        .panel__header
          h3 API : <span class="label">/current_status</span>
          .input__group
            input(value="https://dashboard.entreprise.api.gouv.fr/api/watchdoge/dashboard/current_status")
            a(class="button" target="_blank" href="https://dashboard.entreprise.api.gouv.fr/api/watchdoge/dashboard/current_status") GET

        .row
          div
            pre
            ul
              li <span class="label">uname</span>: nom unique de l’API
              li <span class="label">name</span>: nom d’affichage de l’API
              li <span class="label">provider</span>: nom du fournisseur de données
              li <span class="label">code</span>: dernier code HTTP renvoyé par l’API
              li <span class="label">timestamp</span>: horodatage du dernier appe

          div
            p Voici un exemple de réponse :

            pre
              code.
                {
                  "results": [
                    {
                      "uname": "apie_2_etablissements",
                      "name": "Etablissements",
                      "provider": "insee",
                      "api_version": 2,
                      "code": 200,
                      "timestamp": "2019-06-13T09:00:02.790Z"
                    },
                    {
                      "uname": "apie_2_certificats_qualibat",
                      "name": "Certificats Qualibat",
                      "provider": "qualibat",
                      "api_version": 2,
                      "code": 200,
                      "timestamp": "2019-06-13T09:00:29.752Z"
                    },
                    { ... }
                  ]
                }

      .panel
        .panel__header
          h3 API : <span class="label">/availability_history</span>
          .input__group
            input(value="https://dashboard.entreprise.api.gouv.fr/api/watchdoge/dashboard/availability_history")
            a(class="button" target="_blank" href="https://dashboard.entreprise.api.gouv.fr/api/watchdoge/dashboard/availability_history") GET

        .row
          div
            p Ici les APIs sont groupées par fournisseurs.

            ul
              li <span class="label">provider_name</span>: nom du fournisseur de données
              li <span class="label">endpoints_availability_history</span>: contient la liste des APIs sous surveillance pour ce fournisseur

            pre
            p Un élément de <span class="label">endpoints_availability_history</span> contient :
            ul
              li <span class="label">uname</span>: nom unique de l’API
              li <span class="label">name</span>: nom d’affichage de l’API
              li <span class="label">provider</span>: nom du fournisseur de données
              li <span class="label">api_version</span>: numéro de version de l’API Entreprise
              li <span class="label">timezone</span>: fuseau horaire utilisés pour les mesures transmises
              li <span class="label">sla</span>: Service-Level Agreement constaté sur la semaine en pourcentage
              li <span class="label">availability_history</span>: historique mesuré

            pre
            p <span class="label">availability_history</span> est une liste chronologique (du plus vieux au plus récent) indiquant l’état constaté de l’API sur la dernière semaine et ce groupé par code HTTP.
            p Chaque élément de la liste contient 3 éléments:
            ol
              li horaire de début
              li code HTTP de l’API entre le début et la fin
              li horaire de fin

            p Dans l’exemple ci-contre <span class="label">apie_2_entreprises</span> a renvoyé un code HTTP durant toute la semaine du 2019-06-06 au 2019-06-13.

            p  À contrario <span class="label">apie_2_etablissements</span> a renvoyé :

            ul
              li un code HTTP 200 entre le 2019-06-06 et le 2019-06-10
              li puis un code HTTP 500 durant 26h entre 06-10 à 8h et 06-11 à 10h
              li et un code HTTP 200 jusqu’au 2019-06-13

          div
            p Voici un exemple de réponse :

            pre
              code.
                {
                  "results": [
                    {
                      "provider_name": "insee",
                      "endpoints_availability_history": [
                        {
                          "uname": "apie_2_entreprises",
                          "name": "Entreprise",
                          "provider": "insee",
                          "api_version": 2,
                          "timezone": "Europe/Paris",
                          "provider_name": null,
                          "sla": 94.34,
                          "availability_history": [
                            [
                              "2019-06-06 02:00:03",
                              200,
                              "2019-06-13 11:00:03"
                            ]
                          ]
                        },
                        {
                          "uname": "apie_2_etablissements",
                          "name": "Etablissements",
                          "provider": "insee",
                          "api_version": 2,
                          "timezone": "Europe/Paris",
                          "provider_name": null,
                          "sla": 94.72,
                          "availability_history": [
                            [
                              "2019-06-06 02:00:25",
                              200,
                              "2019-06-10 08:00:04"
                            ],
                            [
                              "2019-06-10 08:00:04",
                              500,
                              "2019-06-11 10:02:14"
                            ],
                            [
                              "2019-06-11 10:02:14",
                              200,
                              "2019-06-13 11:00:03"
                            ]
                          ]
                        },
                        { ... }
                      ]
                    },

</template>

<script>
export default {
  name: "Documentation"
};
</script>

<style>
code {
  color: initial;
}
</style>
