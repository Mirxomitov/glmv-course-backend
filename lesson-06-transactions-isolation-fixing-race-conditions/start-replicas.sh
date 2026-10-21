#!/usr/bin/env bash
#
# Start the local 3-node MongoDB replica set (rs0) for this lesson.
#
# Each node is a separate mongod process with its own data dir and port, all
# sharing --replSet rs0. They run backgrounded (--fork) so they survive closing
# the terminal. Run this once when you sit down to work.
#
#   ./start-replicas.sh          # start any nodes that aren't already running
#   ./start-replicas.sh status   # just show the replica set status
#
set -euo pipefail

# Always operate from the project root (where this script lives), so the
# relative --dbpath values resolve correctly no matter where you call it from.
cd "$(dirname "$0")"

# node "<port> <data dir>"
NODES=(
  "27018 .mongodb-data"
  "27019 .mongodb-data-2"
  "27020 .mongodb-data-3"
)

start_node() {
  local port="$1" dbpath="$2"

  if lsof -i ":${port}" >/dev/null 2>&1; then
    echo "node ${port} already running — skipping"
    return
  fi

  mkdir -p "${dbpath}"
  echo "starting node ${port} (dbpath ${dbpath}) ..."
  mongod \
    --replSet rs0 \
    --dbpath "./${dbpath}" \
    --port "${port}" \
    --bind_ip 127.0.0.1 \
    --fork \
    --logpath "./${dbpath}/mongod.log"
}

show_status() {
  echo
  echo "replica set status:"
  mongosh "mongodb://127.0.0.1:27018/?replicaSet=rs0" --quiet \
    --eval 'rs.status().members.map(m => ({ name: m.name, state: m.stateStr }))'
}

if [[ "${1:-}" == "status" ]]; then
  show_status
  exit 0
fi

for node in "${NODES[@]}"; do
  read -r port dbpath <<<"${node}"
  start_node "${port}" "${dbpath}"
done

# Give the nodes a moment to come up, then report.
sleep 2
show_status
