import type { IAssetVisualizationLayer } from './IAssetVisualizationLayer'

export interface IAssetVisualizationDirection {
    layers?: { [index: string]: IAssetVisualizationLayer }
}
