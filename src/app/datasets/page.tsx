import { getAllDatasets } from "@/lib/content";
import { DatasetCard } from "@/components/dataset-card";

export default function DatasetsPage() {
  const datasets = getAllDatasets().sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Datasets
          </h1>
          <p className="text-xl text-muted-foreground">
            Open datasets for advancing equitable digital agriculture research. 
            All datasets are freely available to support researchers and developers working on African language technologies.
          </p>
        </div>

        {/* Datasets Grid */}
        {datasets.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {datasets.map((dataset, index) => (
              <div
                key={dataset.slug}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <DatasetCard dataset={dataset} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No datasets available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
