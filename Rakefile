wd1 = 'dashboard.entreprise.api.gouv.fr'
wd2 = 'ns3073182.ip-217-182-164.eu'

domains = [wd1, wd2]

task :setup do
  domains.each do |domain|
    sh "mina setup domain=#{domain}"
  end
end

task :deploy do
  domains.each do |domain|
    sh "mina deploy domain=#{domain}"
  end
end
