test:
	node tests/basictests.js

run:
	node post-matchup.js

stop-docker-machine:
	docker-machine stop dev

start-docker-machine:
	docker-machine start dev

# connect-to-docker-machine:
	# eval "$(docker-machine env dev)"

build-docker-image:
	docker build -t jkang/matchupbot .

push-docker-image: build-docker-image
	docker push jkang/matchupbot

run-docker-tweet:
	docker run -v $(HOMEDIR)/config:/usr/src/app/config \
		jkang/matchupbot make run

pushall: push-docker-image
	git push origin master
