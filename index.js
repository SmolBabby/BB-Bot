const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./app.js', { token: 'NzYxNzUyNjA2Nzk5NTYwNzg3.X3fLZg.Q8oWsZm_8AaVWARLXJ03_NgCHeQ' });
console.clear()
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn();