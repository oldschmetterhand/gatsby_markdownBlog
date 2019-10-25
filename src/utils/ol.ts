
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
