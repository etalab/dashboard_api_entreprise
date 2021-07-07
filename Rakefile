wd1 = 'ns3162821.ip-51-91-107.eu'
wd2 = 'ns3189474.ip-135-125-108.eu'

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
