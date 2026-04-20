-module(main).
-export([start/0]).

start() -> io:format("{\"status\":\"ok\",\"stack\":\"erlang\"}~n").
