import { Feature } from "ol"

/**
 * Checks if given feature consists of multiple features. If yes -> it might be
 * a cluster.
 * @param feature Feature to analyze.
 * @returns Boolean if Feature consists of multiple features and therefore might be a Cluster.
 */
export const isCluster = (feature: Feature): boolean => {
  return feature.get("features").length > 1
}

/**
 * Checks if a feature contains other features with coordinates all the same.
 * It investagites a programmatically generated cluster -- not the orginal data! (beware of bugs)
 * @param clusterFeature feature that contains other features inside feature.get('features')
 * @returns boolean if the contained features have the same coordinates.
 */
export const isSameCoordsCluster = (clusterFeature: Feature): boolean => {
  let features: Feature[] = clusterFeature.get("features")
  let coords = features.map(feature =>
    feature
      .getGeometry()
      .getExtent()
      .toString()
  )
  return coords.every((val, i, arr) => val === arr[0])
}
