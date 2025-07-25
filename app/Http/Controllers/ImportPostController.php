<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Post;

class ImportPostController extends Controller
{
    public function import()
    {
        $response = Http::get('https://jsonplaceholder.typicode.com/posts');

        if ($response->successful()) {
            $posts = $response->json();

            foreach ($posts as $data) {
                Post::updateOrCreate(
                    ['external_id' => $data['id']], // unique check
                    [
                        'title' => $data['title'],
                        'body' => $data['body'],
                    ]
                );
            }

            return response()->json(['message' => 'Posts imported successfully']);
        }

        return response()->json(['error' => 'Failed to fetch posts'], 500);
    }
}
