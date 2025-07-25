<?php

namespace App\Console\Commands;

use App\Models\Post;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
class ImportPosts extends Command
{
    protected $signature = 'import:posts';
    protected $description = 'Import posts from JSONPlaceholder API and store in DB';

    public function handle(): int
    {
        $this->info('Fetching posts from external API...');

        $response = Http::get('https://jsonplaceholder.typicode.com/posts');

        if (!$response->successful()) {
            $this->error('Failed to fetch posts');
            return Command::FAILURE;
        }

        $posts = $response->json();

        foreach ($posts as $data) {
            Post::updateOrCreate(
                ['external_id' => $data['id']],
                [
                    'title' => $data['title'],
                    'body' => $data['body'],
                ]
            );
        }

        $this->info('Posts imported successfully!');

        return Command::SUCCESS;
    }
}
