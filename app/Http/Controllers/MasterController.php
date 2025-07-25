<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Busniess;
use App\Models\LeadType;
use App\Models\LeadSource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class MasterController extends Controller
{
   public function leadtype(Request $request)
{
    $search = $request->input('search');
    $sort = $request->input('sort', 'asc');
    $page = $request->input('page', 1); // default to page 1

    $cacheKey = "lead_types_page_{$page}_search_{$search}_sort_{$sort}";

    // Only cache unfiltered results for performance
    if (empty($search)) {
        $leadTypesPaginated = Cache::remember($cacheKey, 3600, function () use ($sort) {
            return DB::table('lead_types')
                ->select('id', 'name')
                ->orderBy('name', $sort)
                ->paginate(10);
        });
    } else {
        // No caching for filtered queries
        $query = DB::table('lead_types')
            ->select('id', 'name');

        if ($search) {
            $query->where('name', 'like', "%$search%");
        }

        $query->orderBy('name', $sort);

        $leadTypesPaginated = $query->paginate(10)->appends([
            'search' => $search,
            'sort' => $sort,
        ]);
    }

    return Inertia::render('master/leadtype', [
        'leadTypes' => $leadTypesPaginated->items(),
        'filters' => compact('search', 'sort'),
        'pagination' => [
            'current_page' => $leadTypesPaginated->currentPage(),
            'last_page' => $leadTypesPaginated->lastPage(),
            'per_page' => $leadTypesPaginated->perPage(),
            'total' => $leadTypesPaginated->total(),
        ],
    ]);
}

    public function store(Request $request)
{
    $request->validate([
        'name' => 'required|unique:lead_types,name',
    ]);

    LeadType::create(['name' => $request->name]);

    // Clear cache so next fetch reloads fresh data
      Cache::flush(); // or selectively clear: Cache::forget('lead_types_page_1_search__sort_asc');

    return redirect()->route('leadtype.index')->with('success', 'Lead type created.');
}


public function update(Request $request, $id)
{
    $request->validate([
        'name' => 'required|unique:lead_types,name,' . $id,
    ]);

    $leadType = LeadType::findOrFail($id);
    $leadType->update([
        'name' => $request->name,
    ]);

    // Clear cache so updated data is reflected
    Cache::flush();

    return redirect()->route('leadtype.index')->with('success', 'Lead type updated.');
}

public function destroy($id)
{
    $leadType = LeadType::findOrFail($id);
    $leadType->delete();

    // Clear cache so deleted item is removed from list
    Cache::flush();

    return redirect()->route('leadtype.index')->with('success', 'Lead type deleted.');
}




//lead source methods can be added here similarly

 public function leadsource(Request $request)
{
    $search = $request->input('search');
    $sort = $request->input('sort', 'asc');
    $page = $request->input('page', 1); // default to page 1

    $cacheKey = "lead_sources_page_{$page}_search_{$search}_sort_{$sort}";

    // Only cache unfiltered results for performance
    if (empty($search)) {
        $leadTypesPaginated = Cache::remember($cacheKey, 3600, function () use ($sort) {
            return DB::table('lead_sources')
                ->select('id', 'name')
                ->orderBy('name', $sort)
                ->paginate(10);
                // dd($leadTypesPaginated);
        });
    } else {
        // No caching for filtered queries
        $query = DB::table('lead_sources')
            ->select('id', 'name');

        if ($search) {
            $query->where('name', 'like', "%$search%");
        }

        $query->orderBy('name', $sort);

        $leadTypesPaginated = $query->paginate(10)->appends([
            'search' => $search,
            'sort' => $sort,
        ]);
    }
// dd($leadTypesPaginated->items());
    return Inertia::render('master/leadsource', [
        'LeadSources' => $leadTypesPaginated->items(),
        'filters' => compact('search', 'sort'),
        'pagination' => [
            'current_page' => $leadTypesPaginated->currentPage(),
            'last_page' => $leadTypesPaginated->lastPage(),
            'per_page' => $leadTypesPaginated->perPage(),
            'total' => $leadTypesPaginated->total(),
        ],
    ]);
}

    public function leadsourcestore(Request $request)
{
    
    $request->validate([
        'name' => 'required|unique:lead_sources,name',
    ]);

    LeadSource::create(['name' => $request->name,'created_by' => auth()->id()]);

    // Clear cache so next fetch reloads fresh data
      Cache::flush(); // or selectively clear: Cache::forget('lead_types_page_1_search__sort_asc');

    return redirect()->route('leadsource.index')->with('success', 'Lead type created.');
}


public function leadsourceupdate(Request $request, $id)
{
    $request->validate([
        'name' => 'required|unique:lead_types,name,' . $id,
    ]);

    $leadType = LeadSource::findOrFail($id);
    $leadType->update([
        'name' => $request->name,
    ]);

    // Clear cache so updated data is reflected
    Cache::flush();

    return redirect()->route('leadsource.index')->with('success', 'Lead type updated.');
}

public function leadsourcedestroy($id)
{
    $leadType = LeadSource::findOrFail($id);
    $leadType->delete();

    // Clear cache so deleted item is removed from list
    Cache::flush();

    return redirect()->route('leadsource.index')->with('success', 'Lead type deleted.');
}



//busniess setting
 public function busniessindex(Request $request)
    {
         $search = $request->input('search');
    $sort = $request->input('sort', 'asc');
    $page = $request->input('page', 1); // default to page 1

    $cacheKey = "busniesses_page_{$page}_search_{$search}_sort_{$sort}";

    // Only cache unfiltered results for performance
    if (empty($search)) {
        $leadTypesPaginated = Cache::remember($cacheKey, 3600, function () use ($sort) {
            return DB::table('busniesses')
                ->select('id', 'name')
                ->orderBy('name', $sort)
                ->paginate(10);
                // dd($leadTypesPaginated);
        });
    } else {
        // No caching for filtered queries
        $query = DB::table('busniesses')
            ->select('id', 'name');

        if ($search) {
            $query->where('name', 'like', "%$search%");
        }

        $query->orderBy('name', $sort);

        $leadTypesPaginated = $query->paginate(10)->appends([
            'search' => $search,
            'sort' => $sort,
        ]);
    }
        return Inertia::render('master/Business', [
            // 'businesses' => $businesses,
             'businesses' => $leadTypesPaginated->items(),
        'filters' => compact('search', 'sort'),
        'pagination' => [
            'current_page' => $leadTypesPaginated->currentPage(),
            'last_page' => $leadTypesPaginated->lastPage(),
            'per_page' => $leadTypesPaginated->perPage(),
            'total' => $leadTypesPaginated->total(),
        ],
        ]);
    }

    public function busniessstore(Request $request)
    {
        // dd($request->all());
         // Validate the request
        $request->validate([
            'name' => 'required|unique:busniesses,name',
        ]);

        Busniess::create([
            'name' => $request->name,
            'created_by' => auth()->id(),
        ]);
         Cache::flush(); // Clear cache so next fetch reloads fresh data

        return redirect()->back()->with('success', 'Business created!');
    }



    public function busniessupdate(Request $request, $id)
{
    $request->validate([
        'name' => 'required|unique:lead_types,name,' . $id,
    ]);

    $leadType = LeadSource::findOrFail($id);
    $leadType->update([
        'name' => $request->name,
    ]);

    // Clear cache so updated data is reflected
    Cache::flush();

    return back()->with('success', 'Lead type updated.');
}
public function busniessdestroy($id)
{
    $leadType = LeadSource::findOrFail($id);
    $leadType->delete();

    // Clear cache so deleted item is removed from list
    Cache::flush();

    return redirect()->with('success', 'Lead type deleted.');
}

}
