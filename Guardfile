# A sample Guardfile
# More info at https://github.com/guard/guard#readme

## Uncomment to clear the screen before every task
clearing :on

guard 'bundler' do
  watch('Gemfile')
  # Uncomment next line if Gemfile contain `gemspec' command
  # watch(/^.+\.gemspec/)
end


guard :rspec, cmd: "bundle exec rspec" do
  require "guard/rspec/dsl"
  dsl = Guard::RSpec::Dsl.new(self)

  # Feel free to open issues for suggestions and improvements

  # RSpec files
  rspec = dsl.rspec
  watch(rspec.spec_helper) { rspec.spec_dir }
  watch(rspec.spec_support) { rspec.spec_dir }
  watch(rspec.spec_files)

  # Ruby files
  ruby = dsl.ruby
  dsl.watch_spec_files_for(ruby.lib_files)

  watch(%r{^spec/(.+)_spec\.rb$})   { |m| "spec/#{m[1]}_spec.rb" }
  watch(%r{^config/(.+)\.rb$})      { "spec" }
  # watch(%r{^app/(.+)\.rb$})        { "spec/app" }
  watch(%r{^lib/(.+)\.rake$})       { "spec/lib" }
  watch(%r{^models/(.+)\.rb$})      { "spec/models" }
  watch(%r{^views/(.+)\.rb$})       { "spec/views" }
  watch('app.rb')                   { "spec/app_spec.rb" }
  watch('spec/spec_helper.rb')      { "spec" }
end
