<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use App\Events\MessageSent;

class MessageController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $messages = Message::where('sender_id', $user->id)
            ->orWhere('receiver_id', $user->id)
            ->with(['sender', 'receiver'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($messages);
    }

    public function conversations()
    {
        $user = auth()->user();
        $conversations = User::whereHas('messages', function($query) use ($user) {
            $query->where('sender_id', $user->id)
                  ->orWhere('receiver_id', $user->id);
        })->with(['messages' => function($query) use ($user) {
            $query->where('sender_id', $user->id)
                  ->orWhere('receiver_id', $user->id)
                  ->latest();
        }])->get();

        return response()->json($conversations);
    }

    public function show($id)
    {
        $message = Message::with(['sender', 'receiver'])->findOrFail($id);
        return response()->json($message);
    }

    public function store(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'content' => 'required|string',
            'project_id' => 'nullable|exists:projects,id',
        ]);

        $message = Message::create([
            'sender_id' => auth()->id(),
            'receiver_id' => $request->receiver_id,
            'project_id' => $request->project_id,
            'content' => $request->content,
        ]);

        // Broadcast the event
        broadcast(new MessageSent($message))->toOthers();

        return response()->json([
            'message' => $message->load(['sender', 'receiver']),
            'status' => 'Message sent!'
        ]);
    }

    public function markAsRead($id)
    {
        $message = Message::findOrFail($id);
        $message->update(['is_read' => true, 'read_at' => now()]);

        return response()->json(['status' => 'Message marked as read']);
    }

    public function destroy($id)
    {
        $message = Message::findOrFail($id);
        $message->delete();
        return response()->json(['status' => 'Message deleted']);
    }
}