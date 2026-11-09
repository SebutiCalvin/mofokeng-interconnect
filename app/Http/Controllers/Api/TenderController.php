<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tender;
use App\Models\TenderApplication;
use Illuminate\Http\Request;

class TenderController extends Controller
{
    public function index(Request $request)
    {
        $query = Tender::where('status', '!=', 'closed')
            ->orderBy('submission_deadline', 'asc');

        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        $tenders = $query->paginate(10);

        return response()->json($tenders);
    }

    public function show($id)
    {
        $tender = Tender::with(['user'])->findOrFail($id);
        $tender->increment('views');
        return response()->json($tender);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'location' => ['nullable', 'string', 'max:255'],
            'category' => ['nullable', 'string'],
            'budget' => ['nullable', 'string'],
            'submission_deadline' => ['required', 'date', 'after:today'],
        ]);

        $tender = $request->user()->tenders()->create($validated);

        return response()->json([
            'tender' => $tender,
            'message' => 'Tender posted successfully!'
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $tender = $request->user()->tenders()->findOrFail($id);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'location' => ['nullable', 'string', 'max:255'],
            'category' => ['nullable', 'string'],
            'budget' => ['nullable', 'string'],
            'submission_deadline' => ['required', 'date'],
            'status' => ['in:open,closing_soon,closed,awarded'],
        ]);

        $tender->update($validated);

        return response()->json([
            'tender' => $tender,
            'message' => 'Tender updated successfully!'
        ]);
    }

    public function destroy($id)
    {
        $tender = request()->user()->tenders()->findOrFail($id);
        $tender->delete();

        return response()->json([
            'message' => 'Tender deleted successfully!'
        ]);
    }

    public function apply(Request $request, $id)
    {
        $tender = Tender::findOrFail($id);

        if ($tender->status === 'closed') {
            return response()->json([
                'message' => 'This tender is closed'
            ], 400);
        }

        $request->validate([
            'cover_letter' => ['required', 'string'],
            'documents' => ['nullable', 'array'],
            'proposed_budget' => ['nullable', 'string'],
        ]);

        $application = TenderApplication::create([
            'tender_id' => $tender->id,
            'constructor_id' => $request->user()->constructor->id,
            'cover_letter' => $request->cover_letter,
            'documents' => $request->documents ?? [],
            'proposed_budget' => $request->proposed_budget,
            'status' => 'pending',
        ]);

        $tender->increment('applications_count');

        return response()->json([
            'application' => $application,
            'message' => 'Application submitted successfully!'
        ]);
    }
}