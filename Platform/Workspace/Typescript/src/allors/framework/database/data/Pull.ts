import { Extent } from './Extent';
import { ISessionObject } from '../../workspace';
import { Result } from './result';
import { FlatPull } from './FlatPull';
import { ObjectType } from '../../meta/ObjectType';
import { MetaObjectType } from '../../meta';
import { Filter } from './Filter';
import { Fetch } from './Fetch';
import { Path } from './Path';
import { Tree } from './Tree';

export class Pull {

  public extentRef: string;

  public extent: Extent;

  public object: ISessionObject | string;

  public results: Result[];

  constructor(fields?: Partial<Pull> | ObjectType | MetaObjectType, flat?: FlatPull) {
    if (fields instanceof ObjectType || (fields as MetaObjectType)._objectType) {
      const objectType = (fields as MetaObjectType)._objectType ? (fields as MetaObjectType)._objectType : fields as ObjectType;

      if (flat.predicate) {
        if (this.extent || this.extentRef) {
          throw new Error('predicate conflicts with extent/extentRef');
        }

        this.extent = new Filter({ objectType: objectType, predicate: flat.predicate });
      }

      if (flat.fetchRef || flat.fetch || flat.name || flat.skip || flat.take || flat.path || flat.include) {
        const result = new Result({
          fetchRef: flat.fetchRef,
          fetch: flat.fetch,
          name: flat.name,
          skip: flat.skip,
          take: flat.take
        });


        if (flat.path || flat.include) {
          if (!result.fetch) {
            result.fetch = new Fetch();
          }

          const fetch = result.fetch;

          if (flat.path) {
            fetch.path = flat.path instanceof Path ? flat.path : new Path(objectType, flat.path);
            if (flat.include) {
              if (!(flat.include instanceof Tree)) {
                throw new Error('literal include conflicts with path');
              }

              fetch.include = flat.include;
            }
          } else {
            fetch.include = flat.include instanceof Tree ? flat.include : new Tree(objectType, flat.include);
          }
        }

        this.results = this.results || [];
        this.results.push(result);
      }
    } else {
      Object.assign(this, fields);
    }
  }

  public toJSON(): any {

    const sessionObject = this.object as ISessionObject;

    return {
      extentRef: this.extentRef,
      extent: this.extent,
      object: sessionObject && sessionObject.id ? sessionObject.id : this.object,
      results: this.results,
    };
  }
}