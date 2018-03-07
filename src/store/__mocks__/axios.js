const axios = {
  create: () => { return axios },
  get: (url) => new Promise(resolve => {
    switch (url) {
      case '/homepage_status':
        resolve({'results': [{'name': 'APIE Homepage', 'code': 200, 'timestamp': '2018-03-07T14:47:34.321Z'}]})
        break
      case '/current_status':
        resolve({'results': [{'uname': 'apie_1_certificats_qualibat', 'name': 'Certificats Qualibat', 'provider': 'qualibat', 'api_version': 1, 'code': 200, 'timestamp': '2018-03-07T14:50:10.585Z'}]})
        break
      case '/availability_history':
        resolve({'results': [{'provider_name': 'dgfip', 'endpoints_availability_history': [{'uname': 'apie_2_liasses_fiscales_dgfip_declaration', 'name': 'Liasses fiscales (déclaration)', 'provider': 'dgfip', 'api_version': 2, 'timezone': 'Europe/Paris', 'provider_name': null, 'sla': 0.0, 'availability_history': [['2018-02-28 01:00:02', 500, '2018-03-07 15:00:03']]}]}]})
    }
  })
}

export default axios
